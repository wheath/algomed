# Requirements
# pip install u-msgpack-python
import umsgpack

if __name__ == '__main__':
    f = open('RawMultiSig.tx', 'rb')
    umsgpack.unpack(f)
    f.close()
