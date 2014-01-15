for file in $(find ./)
do
	echo $file
	cat $file | grep "2em"
done
