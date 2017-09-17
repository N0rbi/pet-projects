# -*- coding: utf-8 -*-

from __future__ import print_function

import tensorflow as tf

# import MNIST data
from tensorflow.examples.tutorials.mnist import input_data

mnist = input_data.read_data_sets('/tmp/data/', one_hot=True)

# Parameters
learning_rate = 0.01
training_epochs = 25
batch_size = 100
display_step = 1

# tensorflow graph input
x = tf.placeholder(tf.float32, [None, 28*28])
y = tf.placeholder(tf.float32, [None, 10])

# Set model weights
W = tf.Variable(tf.zeros([28*28, 10]))
b = tf.Variable(tf.zeros([10]))

# Construction the model

pred = tf.nn.softmax(tf.matmul(x, W) + b)

# Minimize with cross entropy
cost = tf.reduce_mean(-tf.reduce_sum(y*tf.log(pred), reduction_indices=1))

# Gradient Descent
optimizer = tf.train.GradientDescentOptimizer(learning_rate).minimize(cost)

# Init the values
init = tf.global_variables_initializer()

# Start the training
with tf.Session() as sess:
    #Init
    sess.run(init)
    
    #training cycle
    for epoch in range(training_epochs):
        avg_cost = 0
        total_batch = int(mnist.train.num_examples/batch_size)
        # looping the batches
        for _ in range(total_batch):
            batch_xs, batch_ys = mnist.train.next_batch(batch_size)
            # Run optimization on OP
            _, c = sess.run([optimizer, cost], feed_dict={x: batch_xs, y: batch_ys})
    print('DONE.')
    
    correct_prediction = tf.equal(tf.argmax(pred, 1), tf.argmax(y, 1))
    # Calculate accuracy
    accuracy = tf.reduce_mean(tf.cast(correct_prediction, tf.float32))
    
    print('Accuracy: ', accuracy.eval({x: mnist.test.images, y: mnist.test.labels}))