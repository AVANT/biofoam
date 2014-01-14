for file in $(find ./)
do
	echo $file
	cat $file | grep "padding-breakdown"
done
