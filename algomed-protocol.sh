# Wallet Menomic
# When you download the app, this is generated for you automatically or you can import an exisiting one
MENOMIC="bring tongue motion weasel essence blur choice body record mansion water hunt tone elbow energy orient board dinner lock butter timber copy kiwi ability tone"

# Create Accounts x3
goal account new -d data/relay

# Account 1 - Patient
ALGOMED_PATIENT=ESLLM27SMAO5YKI5VZZXFAJY45H5F5YLTX7CWX3OQGNIBPIE52YIKN35AQ
# Account 2 - Doctor
ALGOMED_DOCTOR=H6NYGRPR72I7OJEQMAXYWBSC2ETDZGYH64MYLK3ZJALHJ54DONOXCDBHVQ
# Account 3 - Supplier
ALGOMED_SUPPLIER=6DXVEOXL6IWOIXXRQTWALAPZIWEFN2Z4ODYXRL5VSWJPMXSMGRHVHKT3D4

# Get Status - Successfully connected to Algorand
goal node status -d data/relay/
goal account list -d data/relay/

# Create 3 Way MultiSig account between Patient, Doctor and Supplier
goal account multisig new $ALGOMED_PATIENT $ALGOMED_DOCTOR $ALGOMED_SUPPLIER -k 3               -d data/relay/

# New join account from Multi Sig
ALGOMED_MULTISIG=S4C2GUS36TVRA57H5NRI2JUNLZEYFREKGRE4L775TXPYD76VBN6JGCVKH4

# Doctors script / message to be included in transaction (Can be encrypted using patients public key)
TX_MSG="Send_20_MediAid"

# Patient sends money to Multi Sig for medicine (Can also be funded by donationa and insurance)
goal clerk send -a 300000 -f $ALGOMED_PATIENT -t $ALGOMED_MULTISIG -d data/relay/

# We generate a 3 way transaction for delivery of medicine
goal clerk send -a 30000 -f $ALGOMED_MULTISIG -t $ALGOMED_SUPPLIER -o ./RawMultiSig.tx -d data/relay/ -n $TX_MSG

# 1) First the doctor signs the initial script. Transaction file is sent via end to end encryption to the supplier.
goal clerk multisig sign -t ./RawMultiSig.tx -a $ALGOMED_DOCTOR -d data/relay/
# 2) Supplier signs on filling of script and funding of join account.
goal clerk multisig sign -t ./RawMultiSig.tx -a $ALGOMED_SUPPLIER -d data/relay/
# 3) On deliver or pickup, final signiture is used to authenticate doctor to patient delivery.
goal clerk multisig sign -t ./RawMultiSig.tx -a $ALGOMED_PATIENT -d data/relay/

# Send msg to algorand and unlock multisig
goal clerk rawsend -f ./RawMultiSig.tx -d data/relay/

# Final transaction on testnet
# https://algoexplorer.io/tx/H5I22HAOBD7DJMWLAUACZY7CAQIPDX7ADJZRZLYGWOBB7RPAYD2Q
