import pandas as pd
link=pd.read_csv("result/l/link.csv")
l=[]
for i in range(len(link)):
    l.append([link["source"][i],link["target"][i]])
print(l)
f=pd.read_csv("result/l/dw.csv")
out=[]
for i in range(len(l)):
    t=[]
    d=0
    x=0
    for j in range(len(f)):
        if l[i][0]==f["id"][j]:
            t.append(f["x"][j])
            t.append(f["y"][j])
            if f["du"][j]!=0:
                d=1
            if f["xin"][j]!=0:
                x=1
            break
    for j in range(len(f)):
        if l[i][1] == f["id"][j]:
            t.append(f["x"][j])
            t.append(f["y"][j])
            if f["du"][j] != 0:
                d = 1
            if f["xin"][j] != 0:
                x = 1
            break
    t.append(d)
    t.append(x)
    if d!=0 or x!=0:
        out.append(t)

re=open("result/l/dw1.csv","w")
for i in range(len(out)):
    re.write(str(out[i][0])+","+str(out[i][1])+","+str(out[i][2])+","+str(out[i][3])+","+str(out[i][4])+","+str(out[i][5])+"\n")