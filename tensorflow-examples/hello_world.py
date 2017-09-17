# -*- coding: utf-8 -*-

import tensorflow as tf

# Hello World using tensorflow

# Creating a constant OP that will be added to the DEFAULT GRAPH.
hello = tf.constant('Hello Tensorflow!')


# Running the graph:
with tf.Session() as sess:
    print(sess.run(hello))