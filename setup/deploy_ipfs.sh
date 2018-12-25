for i in "$@"
do
        case $i in
                -d=*|--ipfs-data-dir=*)
                        IPFS_DATA_DIR="${i#*=}"
                        shift # past argument=value
                        ;;
                -p=*|--project-dir=*)
                        PROJECT_DIR="${i#*=}"
                        shift # past argument=value
                        ;;
                *)
                        # unknown option
                        echo "Unknown option"
                        exit 1
                        ;;
        esac
done

PROJECT_PARENT_DIR=$(echo $PROJECT_DIR | sed 's/\(.*\)\/.*$/\1/g')
PROJECT_NAME=$(echo $PROJECT_DIR | sed 's/.*\/\(.*\)$/\1/g')

echo "Deploying $PROJECT_DIR to ipfs"
echo "(Re)starting ipfs docker container...."
docker container restart ipfs_host 2>/dev/null
[[ $? == 0 ]] || docker run -d --name ipfs_host -v $PROJECT_PARENT_DIR:/export -v $IPFS_DATA_DIR:/data/ipfs -p 4001:4001 -p 127.0.0.1:8080:8080 -p 127.0.0.1:5001:5001 ipfs/go-ipfs:latest
sleep 7
echo "Done."
echo ""

echo "Adding project files to ipfs..."
docker exec ipfs_host ipfs add -r /export/$PROJECT_NAME > docker_output.txt
echo ""
cat docker_output.txt | grep added | sed "s/.*added \(.*\) ${PROJECT_NAME}\/*\(.*\)$/\1 \2/g" > ipfs_map.txt
grep " $PROJECT_NAME$" docker_output.txt | awk '{print $2}' > root_address.txt
ROOT_ADDRESS=$(cat root_address.txt)
echo "Publishing to named node..."
docker exec ipfs_host ipfs name publish $ROOT_ADDRESS | sed -e 's/.*to \(.*\)\:.*/\1/g' > ipns_node.txt
NODE_ADDRESS=$(cat ipns_node.txt)
echo "Hash $ROOT_ADDRESS published on node $NODE_ADDRESS."
echo ""

echo "Pinning files..."
docker exec ipfs_host ipfs pin add -r $ROOT_ADDRESS
echo "Done."
echo ""

echo "Visit locally http://localhost:8080/ipfs/$ROOT_ADDRESS"
echo "Or on infura https://ipfs.io/ipns/$NODE_ADDRESS"
echo "(it could take a while before everything is cached)"

