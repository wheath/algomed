# AlgoMed

## Inspiration
The future of medicine is highly targeted however there is the real issue of doctor to patient delivery of medicine.
Say your doctor prescribes gene editing therapy for your stage 4 cancer. The biggest concern is that your medicine which is your DNA, modified with CRISPr, is swapped with someone else's DNA editing medicine. A potential cure, could in fact cause secondary cancers.

## What it does
Introducing AlgoMed, using it's novel provenance protocol, when you go to see the doctor, he would write a script for your medication as usual, but before you leave, would record your Algorand address. An eScript is generated, signed by the doctor, and sent to a supplier (or a network of suppliers). The eScript is actually a 3 of 3 Multisig on the Algorand blockchain.

A supplier will make the order (synthesize the DNA/make the drug etc) and be the second signature on the eScript. The supplier then puts a QR code of the medicine for delivery. Since the QR code is actually a 2 of 3 signed raw Algorand transaction Msgpack binary file, this can be fully public, travel anywhere in the world and only be able to signed by the receiving patient.  

## Market Opportunity
Our first application of this technology will be for AIDS medication in Africa, where proof of provenance from American drug suppliers and rampant counterfeit is causing the death of millions of teens and adults alike for what is currently a treatable disease. AlgoMed will ensure the doctor can cryptographically ensure the correct antiviral drugs are delivered to their patients.

## SDG Goals
We strongly believe our technology will influence and support Goal #3
Goal 3 - Ensure healthy lives and promote well-being for all at all ages

## Impact Potential
17,000 fewer children die each day than in 1990, but more than five million children still die before their fifth birthday each year.
Since 2000, measles vaccines have averted nearly 15.6 million deaths.
36.9 million people globally were living with HIV in 2017.
21.7 million million people were accessing antiretroviral therapy in 2017.
1.8 million people became newly infected with HIV in 2017.
940 000 people died from AIDS-related illnesses in 2017.

## Goal
By 2030, end the epidemics of AIDS, tuberculosis, malaria and neglected tropical diseases and combat hepatitis, water-borne diseases and other communicable diseases.
Most of these are treatable if not avoidable with access to the right medication. Unfortunately is not the case and fraudsters take advantage of the vulnerable and sell counterfeit drugs the afflicted.

## Business Model
We believe this is a first of its kind application of cryptography in this way, made possible with Algorand.
First idea is to patent and licenses the protocol, both generally and in medicine and other supply chain applications.
Additionally, there is an opportunity from the matching of a supplier in a trustless marketplace, as well as charging a 0.5% fee for proof of provenance to the consumer for their peace of mind.

## Partnerships
This naturally forms partnerships from some of the most prominent drug companies who lose an approximate 75 billion each year in counterfeit drugs sales, and the negative branding associated. This brings a positive message and trust into their products using our technology.

## How I built it
Progressive Web App that uses the Algorand SDK to generate a unique MultiSig per script, and allows each of the protocol participants to sign and submit their transactions.

## Challenges I ran into
Algorand isn't fully baked, setting up and running a node was relatively pain-free, there was a learning curve which was technical but enjoyable. There were some serious hurdles with the SDKs however and several inconsistencies in the web app implementation. We had to use some tools to help us and wrote the javascript components in a different framework to get working online with testnet. There were also some cross-browser security vulnerabilities that we came across and shared with the team. The MultiSig implementation was not available and we had multiple people  

## Accomplishments that I'm proud of
* Successfully setting up a private Algorand network
* Generating keys and building a MultiSig transaction from scratch
* Building a progressive web app that interacts with the Algorand public testnet
* Putting a raw, compressed, 2 of 3 signed Algorand transaction into a QR code.

## What I learned
How to actually use Algorand. It is beautiful technology and I'm excited to go further and see what else can be built on top of it.

http://plnkr.co/edit/syyAZxrzaadmwD4kRnAo?p=info

## What's next for AlgoMed
Establish additional business models for this protocol, either from the matching of a supplier in a trustless marketplace, or charging a 0.5% fee for proof of provenance to the consumer for piece of mind.
