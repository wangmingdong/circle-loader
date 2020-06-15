<template>
    <div>
        <div :style="{'width': `${totalSize}px`, 'height': `${totalSize}px`}" class="circle-group">
            <div
                :class="circleClass"
                :style="{'width': `${totalSize}px`, 'height': `${totalSize}px`, 'background-color': defaultColor}"
            >
                <div class="hand">
                    <span
                        :style="{'transform': `rotate(${rotateLeft}deg)`, 'border-width': `${borderWidth}px`, 'border-top-color': highlight, 'border-right-color': highlight}"
                    ></span>
                </div>
                <div class="hand">
                    <span
                        :style="{'transform': `rotate(${rotateRight}deg)`, 'border-width': `${borderWidth}px`, 'border-top-color': highlight, 'border-right-color': highlight}"
                    ></span>
                </div>
                <div :style="{'background-color': insideColor, 'height': `${insideSize}px`, 'width': `${insideSize}px`, 'left': `${insidePosition}px`, 'top': `${insidePosition}px`}" class="inside-circle"></div>
            </div>
        </div>
        <!-- <div>
            <button @click="start()">开始</button>
            <button @click="stop()">暂停</button>
            <button @click="reset()">重置</button>
            <button @click="retrun()">回退</button>
            <button @click="retrun(100)">紧急回退</button>
        </div> -->
    </div>
</template>

<script>
export default {
    name: 'Circle',
    props: {
        // 帧数
        frequency: {
            default: 10,
            type: Number
        },
        // 规格 small normal large
        size: {
            default: 'normal',
            type: String
        },
        // 环形高亮颜色
        highlight: {
            default: 'rgba(4, 96, 245)',
            type: String
        },
        // 默认颜色
        defaultColor: {
            default: 'rgba(61, 61, 61)',
            type: String
        },
        // 圆心颜色
        insideColor: {
            default: '#fff',
            type: String
        },
        // 总时长
        time: {
            default: 3,
            type: Number
        }
    },
    data() {
        return {
            // 动画总时长
            // time: 3,
            // 当前时间
            currentTime: 0,
            rotateLeft: 225,
            rotateRight: 225,
            // 0初始化 1顺时针 -1逆时针
            state: 0,
            // 定时器
            clockTimer: null,
            // 帧数
            // frequency: 10
            // 整体尺寸
            totalSize: 100,
            // 内圆尺寸
            insideSize: 70,
            // 内圆定位 圆宽度
            insidePosition: 15,
            // 填充环宽
            borderWidth: 50
        }
    },
    computed: {
        circleClass() {
            return `${this.size} timer content`
        }
    },
    created() {
        if (this.size === 'small') {
            this.totalSize = 60
            this.insideSize = 40
            this.insidePosition = 10
            this.borderWidth = 30
        } else if (this.size === 'normal') {
            this.totalSize = 100
            this.insideSize = 70
            this.insidePosition = 15
            this.borderWidth = 50
        } else if (this.size === 'large') {
            this.totalSize = 200
            this.insideSize = 130
            this.insidePosition = 35
            this.borderWidth = 100
        }
    },
    beforeDestroy() {
        this.clearTimer()
    },
    methods: {
        clearTimer() {
            if (this.clockTimer) {
                clearInterval(this.clockTimer)
            }
        },
        start() {
            this.clearTimer()
            this.currentTime = 0
            this.clockTimer = setInterval(() => {
                this.currentTime += this.frequency / 1000
                if (this.currentTime >= this.time) {
                    this.clearTimer()
                    this.loadOver()
                    return
                }
                let rate = this.currentTime / this.time
                this.state = 1
                // console.log(rate)
                // 前半段
                this.$nextTick(() => {
                    if (this.currentTime <= this.time / 2) {
                        this.rotateLeft = 225
                        this.rotateLeft += 360 * rate
                        this.rotateRight = 225
                    } else {
                    // 后半圈
                        this.rotateLeft = 405
                        this.rotateRight = 225
                        this.rotateRight += 360 * (rate - 0.5)
                    }
                })
            }, this.frequency)
        },
        stop() {
            this.clearTimer()
        },
        reset() {
            this.clearTimer()
            this.rotateLeft = 225
            this.rotateRight = 225
            this.state = 0
            this.currentTime = 0
            this.rebackOver()
        },
        retrun(shotTime = 1000) {
            this.clearTimer()
            this.clockTimer = setInterval(() => {
                this.currentTime -= this.frequency / shotTime
                if (this.currentTime <= 0) {
                    this.reset()
                    return
                }
                let rate = this.currentTime / this.time
                this.state = -1
                // 前半段
                this.$nextTick(() => {
                    if (this.currentTime <= this.time / 2) {
                        this.rotateLeft = 225 + 360 * rate
                        this.rotateRight = 225
                    } else {
                    // 后半圈
                        this.rotateLeft = 405
                        this.rotateRight = 225 + 360 * (rate - 0.5)
                    }
                })
            }, this.frequency)
        },
        // 加载结束
        loadOver() {
            this.$emit('circle-loader-over')
        },
        // 回退结束
        rebackOver() {
            console.log('clear')
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.circle-group {
    height: 100px;
    position: relative;
    width: 100px;
    margin: auto;
}

.timer {
    border-radius: 50%;
    height: 100px;
    overflow: hidden;
    position: absolute;
    width: 100px;
}

/* .timer:after {
    background-color: #fff;
    border-radius: 50%;
    content: '';
    display: block;
    height: 80px;
    left: 10px;
    position: absolute;
    width: 80px;
    top: 10px;
} */

.inside-circle {
    background-color: #fff;
    border-radius: 50%;
    display: block;
    height: 80px;
    left: 10px;
    position: absolute;
    width: 80px;
    top: 10px;
}

.timer .hand {
    float: left;
    height: 100%;
    overflow: hidden;
    position: relative;
    width: 50%;
}
.timer .hand:first-of-type {
    margin-right: -1px;
}
.timer .hand:last-of-type {
    margin-left: -1px;
}

.timer .hand span {
    border-width: 50px;
    border-style: solid;
    /* border-color: rgba(4, 96, 245); */
    border-bottom-color: transparent;
    border-left-color: transparent;
    border-radius: 50%;
    display: block;
    height: 0;
    position: absolute;
    right: 0;
    top: 0;
    transform: rotate(225deg);
    width: 0;
}

.timer .hand:first-child {
    transform: rotate(180deg);
}

.timer .hand span {
    animation-duration: 4s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
}

.timer .hand:first-child span {
    transform: rotate(-135deg);
}

.timer.content {
    background: rgba(0, 0, 0, 0.2);
    height: 100px;
    left: 0;
    width: 100px;
    top: 0;
    /* transform: rotate(180deg); */
}

.timer.content .hand span {
    animation-duration: 3s;
    border-top-color: rgba(4, 96, 245);
    border-right-color: rgba(4, 96, 245);
    border-width: 50px;
}

.timer.content.small .inside-circle {
    height: 40px;
    left: 10px;
    width: 40px;
    top: 10px;
}

.timer.content.normal .inside-circle {
    height: 70px;
    left: 15px;
    width: 70px;
    top: 15px;
}

.timer.content.large .inside-circle {
    height: 70px;
    left: 15px;
    width: 70px;
    top: 15px;
}
</style>
