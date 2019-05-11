# Wallet Menomic
MENOMIC="bring tongue motion weasel essence blur choice body record mansion water hunt tone elbow energy orient board dinner lock butter timber copy kiwi ability tone"

# Create Accounts
goal account new -d data/relay

# Account 1
ALGOMED_PATIENT=ESLLM27SMAO5YKI5VZZXFAJY45H5F5YLTX7CWX3OQGNIBPIE52YIKN35AQ
# Account 2
ALGOMED_DOCTOR=H6NYGRPR72I7OJEQMAXYWBSC2ETDZGYH64MYLK3ZJALHJ54DONOXCDBHVQ
# Account 3
ALGOMED_SUPPLIER=6DXVEOXL6IWOIXXRQTWALAPZIWEFN2Z4ODYXRL5VSWJPMXSMGRHVHKT3D4

# Get Status
goal node status -d data/relay/
goal account list -d data/relay/

# Create MultiSig
goal account multisig new $ALGOMED_PATIENT $ALGOMED_DOCTOR $ALGOMED_SUPPLIER -k 3 -d data/relay/

ALGOMED_MULTISIG=S4C2GUS36TVRA57H5NRI2JUNLZEYFREKGRE4L775TXPYD76VBN6JGCVKH4

# Send money to Multi Sig
goal clerk send -a 300000 -f $ALGOMED_PATIENT -t $ALGOMED_MULTISIG -d data/relay/

TX_MSG="Send_20_MediAid"
# Multi sig transfer
goal clerk send -a 5000 -f $ALGOMED_MULTISIG -t $ALGOMED_SUPPLIER -o ./RawMultiSig.tx -d data/relay/ -n $TX_MSG
goal clerk multisig sign -t ./RawMultiSig.tx -a $ALGOMED_DOCTOR -d data/relay/
goal clerk multisig sign -t ./RawMultiSig.tx -a $ALGOMED_SUPPLIER -d data/relay/
goal clerk multisig sign -t ./RawMultiSig.tx -a $ALGOMED_PATIENT -d data/relay/

# Send msg
goal clerk rawsend -f ./RawMultiSig.tx -d data/relay/

# Final transaction on testnet
# https://algoexplorer.io/tx/H5I22HAOBD7DJMWLAUACZY7CAQIPDX7ADJZRZLYGWOBB7RPAYD2Q
