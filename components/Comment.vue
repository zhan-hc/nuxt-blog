<template>
  <div class="article-comment card">
    <div class="content-wrap">
        <div class="left-content">
            <img class="avatar" :src="`${imgHost}/avatar/avatar${curAvatarIndex}.png`" alt="">
            <div class="avatar-pop card">
                <img class="avatar" :class="{'active' : curAvatarIndex === i }"
                    v-for="item in 5" :key="item" 
                    :src="`${imgHost}/avatar/avatar${item}.png`"
                    @click="curAvatarIndex = item"
                />
            </div>
            <!-- <el-popover
                :width="210"
                >
                <template #reference>
                    <el-avatar :src="`${imgHost}/avatar/avatar${curAvatarIndex}.png`" />
                </template>
                <template #default>
                    <div style="display: flex;flex-wrap: wrap;justify-content: space-between;">
                        <img 
                            v-for="item in 5" :key="item" 
                            :src="`${imgHost}/avatar/avatar${item}.png`"
                            style="margin: 0 10px 5px 0; cursor: pointer;width: 48px; height: 48px;"
                            @click="curAvatarIndex = item"
                        />
                    </div>
                </template>
            </el-popover> -->
        </div>
        <div class="right-content">
            <svg width="17" height="10" class="radius">
                <path
                fill="white" 
                d="
                    M 0 10 
                    A 10,10,0,0,0,8 7 
                    A 3,3,0,0,1,9 7
                    A 10 10,0,0,0,17 10
                "
                stroke="#c2c8d1"
                stroke-width="1"
                />
            </svg>
            <textarea v-model="content" rows="4" :placeholder="commentPlaceholder"></textarea>
            <div class="btn" @click="onSubmit">提交</div>
        </div>
    </div>
    <div class="comment-list">
        <div class="comment-box" v-for="item in commentList" :key="item.c_id" :class="{author : item.isAuthor}">
            <div class="comment-item">
                <img class="item-avatar" :class="{author : item.isAuthor}" :src="item.avatar" alt="">
                <div class="item-content">
                    <svg width="17" height="10" class="radius">
                        <path
                        :fill="item.isAuthor ? '#3CB371' : '#375f9a'" 
                        d="
                            M 0 10 
                            A 10,10,0,0,0,8 7 
                            A 3,3,0,0,1,9 7
                            A 10 10,0,0,0,17 10
                        "
                        stroke-width="1"
                        />
                    </svg>
                    <div class="text">
                        {{ item.content }}
                    </div>
                </div>
            </div>
            <div class="comment-repay" v-for="childComment in item.comment_repay" :key="childComment.c_id"  :class="{author : childComment.isAuthor}">
                <img class="item-avatar"  :class="{author : childComment.isAuthor}" :src="childComment.avatar" alt="">
                <div class="item-content">
                    <svg width="17" height="10" class="radius">
                        <path
                        :fill="childComment.isAuthor ? '#3CB371' : '#fa8072'" 
                        d="
                            M 0 10 
                            A 10,10,0,0,0,8 7 
                            A 3,3,0,0,1,9 7
                            A 10 10,0,0,0,17 10
                        "
                        stroke-width="1"
                        />
                    </svg>
                    <div class="text">
                        {{ childComment.content }}
                    </div>
                </div>
            </div>
            <div class="repay-text" @click="repay(item)">{{ repayId ? '取消回复' : '回复' }}</div>
        </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { imgHost } from '@/utils/envConfig'

const emit = defineEmits(['submit'])
const props = defineProps({
    commentList: {
        type: Array<any>,
        default: () => []
    }
})
const commentPlaceholder = ref('评论内容')
const curAvatarIndex = ref(1)
const repayId = ref(null)
const content = ref('')

const onSubmit = () => {
    content.value.trim() && emit('submit', {
        avatar: `${imgHost}/avatar/avatar${curAvatarIndex.value}.png`,
        content: content.value,
        parent_id: repayId.value
    }) 
    content.value = ''
    repayId.value = null
    commentPlaceholder.value = ''
}
const repay = (comment: any) => {
    commentPlaceholder.value = repayId.value ? '评论内容'  : `回复‘${comment.content}’`
    repayId.value = repayId.value ? null : comment.c_id
}
</script>

<style scoped lang='scss'>
  .article-comment {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 20px auto;
    padding: 20px;
    box-sizing: border-box;
    font-size: 14px;
    @include bg_color();
    .content-wrap {
        display: flex;
        align-items: center;
    }
    .left-content {
        position: relative;
        .avatar {
            flex-shrink: 0;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            box-sizing: border-box;
            cursor: pointer;
            &.avtive {
                border: 1px solid $primary-color;
            }
        }
        &:hover .avatar-pop {
            display: flex;
        }
        .avatar-pop {
            z-index: 9;
            display: none;
            position: absolute;
            top: -130px;
            right: -200px;
            // display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            background: #000;
            width: 190px;
            padding: 20px;
            border-radius: 10px;
            &:hover {
                box-shadow: 0 4px 8px 6px rgba(7,17,27,0.06);
            }
            &::after {
                content: '';
                width: 50px;
            }
        }
    }
    .right-content {
        position: relative;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        margin-left: 15px;
        .radius {
            z-index: 2;
            position: absolute;
            top: 50%;
            left: -21px;
            transform: translateX(0.5px) translateY(-50%) rotate(-90deg) scale(1.5, 2.8);
        }
        .btn {
            position: absolute;
            right: 5px;
            bottom: 5px;
            margin-top: 10px;
            padding: 5px 10px;
            background: $primary-color;
            color: #fff;
            letter-spacing: 1px;
            border-radius: 4px;
            &:hover {
                cursor: pointer;
            }
        }
        textarea {
            width: 100%;
            padding: 5px;
            border: 2px solid #c2c8d1;
            border-radius: 6px;
            resize: none;
            box-sizing: border-box;
            &:focus {
                outline: none;
                border: 2px solid #c2c8d1;
            }
        }
    }
    .comment-list {
        .comment-box {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-top: 20px;
            &:not(.author):hover {
                .repay-text {
                    display: block;
                }
            }
            &.author {
                flex-direction: row-reverse;
                .comment-item, .comment-repay {
                    flex-direction: row-reverse;
                }
                .item-content {
                    margin-right: 20px;
                    margin-left: 0;
                    .radius {
                        left: unset;
                        right: -18px;
                        transform: translateY(-50%) rotate(90deg) scale(1.5, 2);
                    }
                    .text {
                        background-color: #3CB371;
                    }
                }
                .item-avatar {
                    padding: 6px;
                    box-sizing: border-box;
                }
                 
            }
            .comment-item, .comment-repay {
                display: flex;
                align-items: center;
            }
            .comment-repay {
                margin-left: 60px;
                &.author {
                    .item-avatar {
                        padding: 6px;
                        box-sizing: border-box;
                    }
                    .item-content {
                        .text {
                            background-color: #3CB371;
                        }
                    }
                }
            }
            .item-avatar {
                width: 48px;
                height: 48px;
                border-radius: 50%;
            }
            .item-content {
                position: relative;
                margin-left: 5px;
                .radius {
                    position: absolute;
                    left: -3px;
                    top: 50%;
                    transform: translateY(-50%) rotate(-90deg) scale(1.5, 2);
                }
                .text {
                    margin-left: 15px;
                    padding: 10px 15px;
                    color: #fff;
                    background-color: $primary-color;
                    border-radius: 6px;
                }
            }
            .repay-text {
                display: none;
                position: absolute;
                top: 5px;
                right: 20px;
                color: $primary-color;
                font-size: 14px;
                cursor: pointer;
            }
        }
    }
  }
</style>