# -*- coding: utf-8 -*-

from __future__ import print_function

import tensorflow as tf
from tensorflow.contrib.tensor_forest.python import tensor_forest

# Ignore gpu
from tensorflow.examples.tutorials.mnist import input_data

mnist = input_data.read_data_sets('/tmp/data/', one_hot=False)

#Parameters
num_steps = 500
batch_size = 1024
num_classes = 10
num_features = 784
num_trees = 10
max_nodes = 1000

X = tf.placeholder(tf.float32, shape=[None, num_features])
y = tf.placeholder(tf.int32, shape=[None])

hparams = tensor_forest.ForestHParams(num_classes=num_classes,
                                      num_features=num_features,
                                      num_trees=num_trees,
                                      max_nodes=max_nodes).fill()

forest_graph = tensor_forest.RandomForestGraphs(hparams)

train_op = forest_graph.training_graph(X, y)
loss_op = forest_graph.training_loss(X, y)

#Accuracy
infer_op = forest_graph.inference_graph(X)
correct_prediction = tf.equal(tf.arg_max(infer_op, 1), tf.cast(y, tf.int64))
accuracy_op = tf.reduce_mean(tf.cast(correct_prediction, tf.float32))

init_vars = tf.global_variables_initializer()

sess = tf.Session()

sess.run(init_vars)

for i in range(1, num_steps+1):
    #Data preprocessing
    batch_x, batch_y = mnist.train.next_batch(batch_size)
    _, l = sess.run([train_op, loss_op], feed_dict={X: batch_x, y: batch_y})
    
    if i % 50 == 0 or i == 1:
        acc = sess.run(accuracy_op, feed_dict={X: batch_x, y: batch_y})
        print('Step %i, Loss: %f, Acc: %f' % (i, l, acc))
        
test_x, test_y = mnist.test.images, mnist.test.labels
print("Test accuracy: ", sess.run(accuracy_op, feed_dict={X: test_x, y: test_y}))