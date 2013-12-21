for file in $(find ./)
do
	echo $file
	cat $file | grep '#008cba'
done
