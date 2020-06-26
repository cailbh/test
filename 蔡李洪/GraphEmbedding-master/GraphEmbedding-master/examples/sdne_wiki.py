import numpy as np

from ge.classify import read_node_label, Classifier
from ge import SDNE
from sklearn.linear_model import LogisticRegression

import matplotlib.pyplot as plt
import networkx as nx
from sklearn.manifold import TSNE


def evaluate_embeddings(embeddings):
    X, Y = read_node_label('../data/wiki/wiki_labels.txt')
    tr_frac = 0.8
    print("Training classifier using {:.2f}% nodes...".format(
        tr_frac * 100))
    clf = Classifier(embeddings=embeddings, clf=LogisticRegression())
    clf.split_train_evaluate(X, Y, tr_frac)


def plot_embeddings(embeddings, ):
    X, Y = read_node_label('../data/wiki/wiki_labels.txt')

    emb_list = []
    for k in embeddings:
        emb_list.append(embeddings[k])
    emb_list = np.array(emb_list)

    model = TSNE(n_components=2)
    node_pos = model.fit_transform(emb_list)
    print(node_pos)
    color_idx = {}
    for i in range(len(X)):
        color_idx.setdefault(Y[i][0], [])
        color_idx[Y[i][0]].append(i)

    for c, idx in node_pos:
        plt.scatter(node_pos[idx, 0], node_pos[idx, 1],
                    label=c)  # c=node_colors)
    plt.legend()
    plt.show()


if __name__ == "__main__":
    G = nx.read_edgelist('../data/wiki/test_small.txt',
                         create_using=nx.DiGraph(), nodetype=None, data=[('weight', float)])

    model = SDNE(G, hidden_size=[256, 128], )
    model.train(batch_size=2000, epochs=10000, verbose=2)
    embeddings = model.get_embeddings()
    f = open('../data/wiki/_test_vector.txt', 'w')  # 若是'wb'就表示写二进制文件
    j = 0
    print(embeddings)
    for i in embeddings:
        f.write(i+" ")
        for q in embeddings[i]:
            f.write(str(q)+" ")
            # print(str(q))
        f.write('\n')
        j = j + 1
    f.close()
    # evaluate_embeddings(embeddings)
    # plot_embeddings(embeddings)
