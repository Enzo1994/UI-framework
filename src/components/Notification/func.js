import NotificationComponent from './notification.js'
import Vue from 'vue'

const NotificationConstructor = Vue.extend(NotificationComponent)
const instances = [];

let nid = 0;

const removeEl = function removeEl(instance, el) {

    if (!instance) return;
    const currentIndex = instances.findIndex(item => item.nid == instance.nid);
    const hoverIndex = instances.findIndex(item => !item.timer);

    console.log(currentIndex, hoverIndex)
    instances.splice(currentIndex, 1)

    const len = instances.length;
    
    if (hoverIndex != -1) {
        console.log(hoverIndex)
        // 处理有固定元素的状态
        for (let i = 0, j = hoverIndex; i < hoverIndex, j < instances.length - 1; i++, j++) {

            instances[j].bottomoffset = instances[hoverIndex].bottomOffset; + (instance.height + 16)

        }
    } else {
        if (instances.length <= 1) return;

        for (let i = currentIndex; i < instances.length; i++) {
            instances[i].bottomOffset -= (instance.height + 16)
        }
    }
}

export default function notify(options) {
    let el;

    const instance = new NotificationConstructor({
        propsData: { content: options.content + nid },
    })

    instance.nid = nid++;

    el = instance.$mount().$el

    document.body.appendChild(el)

    instance.visible = true;
    let currentBottomOffset = 0;
    instances.forEach(item => {
        currentBottomOffset += item.$el.offsetHeight + 16
    })
    console.log(instance.height)
    instance.bottomOffset = currentBottomOffset


    instances.push(instance)

    instance.$on('close', () => {
        instance.visible = false // 直接修改v-show的状态，出发transition 的 afterLeave
    })

    instance.$on('closed', () => {

        // 移除组件的操作：
        // 1. 删除数组内的实例
        removeEl(instance, el)
        // 2. 清除vue实例和DOM的绑定
        instance.$destroy()
        // 3，移除DOM节点
        document.body.removeChild(instance.$el)
    })
    instance.$on('mouseover', () => {

    })

    return instance
}