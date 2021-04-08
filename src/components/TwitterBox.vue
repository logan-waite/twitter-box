<template>
    <!-- <div contenteditable="true" class="textbox" @keyup="checkForTags" v-html="text" ref="input"></div>  -->
    <div contenteditable="true" class="textbox" ref="watchedInput" @keyup="$emit('update:content', $event.target.innerHTML)">{{content}}</div>
</template>

<style scoped>
    .textbox {
        padding: 10px;
        margin: 0px;
        font-size: 18px;
        border: 1px solid gray;
        border-radius: 4px;
        font-family: sans-serif;
        text-align: left;
        width: 300px;
        height: 150px;
    }

    .tag {
        pointer-events: initial;
        text-decoration: none;
    }
</style>

<script>
// import * as R from 'ramda'
// import {getChangedTag} from '@/helpers/tags'; 

function getCaretIndex(element) {
    const selection = window.getSelection();
    if (selection.rangeCount !== 0) {
        const range = selection.getRangeAt(0);
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        return {node: selection.anchorNode, index: preCaretRange.toString().length};
    } else {
        return {node: element, index: 0};
    }
}

function setCaretIndex(element, index) {
    const range = document.createRange();
    const selection = document.getSelection();
    console.log({element, index});
    range.setEnd(element, 0);
    range.collapse();

    selection.removeAllRanges();
    selection.addRange(range);
}

export default {
    data() {
        return {
            text: "",
            caretIndex: 0,
            content: '',
        }
    },
    computed: {
        // regex() {
        //     return /@\w*/g
        // },
        adjustedText() {
            return this.text.replace(/@\w*/g, (match) => `<a href="#" class="tag">${match}</a>`)
        }
    },
    methods: {
        checkForTags(event) {
            const text = event.target.innerHTML
            if (text.match(/@\w*/g)) {
                const adjustedText = text.replace(/@\w*/g, (match) => `<a href="#" class="tag">${match}</a>`)
                const caretInfo = getCaretIndex(event.target);
                this.caretIndex = caretInfo.index;
                this.text = adjustedText;
                setCaretIndex(caretInfo.node, caretInfo.index);
            }            
        }
    },
    watch: {
        content() {
            // this.content = this.$refs.watchedInput.innerHTML;
            console.log(this.content)
        }
    }
}
</script>