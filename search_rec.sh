for file in $(find ./)
do
#	echo $file
	cat $file | grep 35729
done
