"use strict";

/**
 * 区块猜随机数生成类
 * 区块猜游戏开奖方式:
 * 1. 游戏开始新的一期时, 记录当前最新的区块号
 * 2. 获取开奖时第[ 周期(分钟) * 4(区块产生频率(≈4个区块/分钟)) ]个区块的 hash值(以"0x"开头)和对应的 parentHash(以"0x"开头)值
 * 3. 为了防止区块链分支出现(出现与游戏中心计算出不同的开奖结果), 开奖时的区块号会等待区块链上新生成10个区块确认以后再生成开奖结果
 *
 * 区块猜游戏开奖规则:
 * 1. 生成第一个随机数: (hash第61位往后取4位 + parentHash第41位往后取4位) 除以 6 取余数, 如果余数为0则当前值为6
 * 2. 生成第二个随机数: (hash第41位往后取4位 + parentHash第21位往后取4位) 除以 6 取余数, 如果余数为0则当前值为6
 * 3. 生成第三个随机数: (hash第21位往后取4位 + parentHash第61位往后取4位) 除以 6 取余数, 如果余数为0则当前值为6
 */
class ThreeRandomNumber{
    /**
     * 区块猜获取到开奖时区块信息
     * @param blockHash 当前游戏期数需要猜的区块 hash值
     * @param parentBlockHash 当前游戏期数需要猜的区块的 parentHash值
     */
    constructor (blockHash, parentBlockHash) {
        this.blockHash = blockHash;
        this.parentBlockHash = parentBlockHash;
    }

    /**
     * 获取随机数
     * @returns ['随机数1','随机数2','随机数3']
     */
    getThreeRandomNumber(){
        let randomNumber1 = this.getRandomNumber(60, 40);
        let randomNumber2 = this.getRandomNumber(40, 20);
        let randomNumber3 = this.getRandomNumber(20, 60);
        return [randomNumber1, randomNumber2, randomNumber3];
    }

    /**
     * 生成随机数
     * @param blockHashStartIndex   当前区块 hash值需要开始截取的下标数
     * @param parentBlockHashStartIndex  当前区块 parentHash值需要开始截取的下标数
     * @returns {number}  当前随机数
     */
    getRandomNumber(blockHashStartIndex, parentBlockHashStartIndex){
        let randomNumber = (parseInt(this.blockHash.substr(blockHashStartIndex, 4), 16) + parseInt((this.parentBlockHash).substr(parentBlockHashStartIndex, 4), 16)) % 6;
        return randomNumber === 0 ? 6 : randomNumber;
    }
}
