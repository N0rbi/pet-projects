# -*- coding: utf-8 -*-

# Basic operations with tensorflow

import tensorflow as tf

## Basic constant operations

a = tf.constant(2)
b = tf.constant(3)

with tf.Session() as sess:
    print('a = %i' % sess.run(a), 'b = %i'% sess.run(b))
    # Adding constancts
    print('a+b= %i' % sess.run(a+b))
    # Multiplying
    print('a*b= %i' % sess.run(a*b))
    
# Variable as graph input

a1 = tf.placeholder(tf.int16)
b1 = tf.placeholder(tf.int16)

# Defining operators
add = tf.add(a1, b1)
mul = tf.multiply(a1, b1)

# Launching default graph ??
with tf.Session() as sess:
    print ("Operation with variables: %i" % sess.run(add, feed_dict={a1: 2, b1: 3}))
    print('Operation with variables (mul): %i' % sess.run(mul, feed_dict={a1: 2, b1: 0}))
    

# Generates constant: [3 3]    
matrix1 = tf.constant([[3.,3.]])
# Generates constant transpose([2 2])
matrix2 = tf.constant([[2.], [2.]])

prod = tf.matmul(matrix1, matrix2)

with tf.Session() as sess:
    # Running prod will also run matrix1 and matrix2
    print(sess.run(prod))
    
