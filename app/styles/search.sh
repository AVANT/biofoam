for file in $(find ./)
do
	echo $file
	cat $file | grep 'body.posts.list .posts .post'
done
