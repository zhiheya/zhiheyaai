import React, { useEffect, useState } from 'react';
import {Button, Space} from "antd";
import {Prompts, PromptsProps, Welcome} from "@ant-design/x";
import {
    CommentOutlined,
    EllipsisOutlined,
    FireOutlined,
    HeartOutlined,
    ReadOutlined,
    ShareAltOutlined,
    SmileOutlined
} from "@ant-design/icons";

const TypewriterBackspace = ({ text }: { text: string }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [speed, setSpeed] = useState(150);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (!isDeleting && displayedText.length < text.length) {
            // 打字阶段
            timer = setTimeout(() => {
                setDisplayedText(text.substring(0, displayedText.length + 1));
            }, speed);
        } else if (displayedText.length === text.length && !isDeleting) {
            // 暂停后开始回退
            timer = setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && displayedText.length > 0) {
            // 回退阶段
            timer = setTimeout(() => {
                setDisplayedText(text.substring(0, displayedText.length - 1));
            }, speed / 2); // 回退速度更快
        } else if (isDeleting && displayedText.length === 0) {
            // 重新开始循环
            timer = setTimeout(() => {
                setIsDeleting(false);
                setSpeed(150 + Math.random() * 100); // 随机速度更自然
            }, 1000);
        }

        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, speed, text]);

    return <span>{displayedText}</span>;
};



const renderTitle = (icon: React.ReactElement, title: string) => (
    <Space align="start">
        {icon}
        <span>{title}</span>
    </Space>
);

const promptItems: PromptsProps['items'] = [
    {
        key: '1',
        label: renderTitle(<FireOutlined style={{color: '#FF4D4F'}}/>, '热门话题'),
        description: '你对什么感兴趣',
        children: [
            {
                key: '1-1',
                description: `你能做什么？`,
            },
            {
                key: '1-2',
                description: `什么是 AGI？`,
            },
            {
                key: '1-3',
                description: `免费吗？`,
            },
        ],
    },
    {
        key: '2',
        label: renderTitle(<ReadOutlined style={{color: '#1890FF'}}/>, '设计指南'),
        description: '如何设计出好产品?',
        children: [
            {
                key: '2-1',
                icon: <HeartOutlined/>,
                description: `设计网页`,
            },
            {
                key: '2-2',
                icon: <SmileOutlined/>,
                description: `角色扮演`,
            },
            {
                key: '2-3',
                icon: <CommentOutlined/>,
                description: `表达感受`,
            },
        ],
    }
];


type Props = {
    handleSubmit: (value: string) => void;
}

/**
 * 初始态的欢迎语和提示词
 */
const InitWelcome = (props: Props) => {
    //const {styles} = useStyle();

    return (
        <Space
            className='pt-10'
            direction='vertical'
            size={16}
        >
            {/* 欢迎语 */}
            <Welcome
                variant="borderless"
                icon="https://pic1.imgdb.cn/item/67d83ea588c538a9b5c00209.gif"
                title="你好，欢迎来到知无涯的DeepSeek   U•ェ•*U"
                description={<TypewriterBackspace text="愿你踏遍山河万里，览尽世间繁华，再以澄明之心，品评人间百态（〃｀ 3′〃）" />}
                extra={
                    <Space>
                        <Button icon={<ShareAltOutlined/>}/>
                        <Button icon={<EllipsisOutlined/>}/>
                    </Space>
                }
            />
            {/* 提示词 */}
            <Prompts
                title={'不知道要做什么？'}
                items={promptItems}
                styles={{
                    list: {
                        width: '100%',
                    },
                    item: {
                        flex: 1,
                    }
                }}
                onItemClick={({data}) => {
                    if (data.description) {
                        props.handleSubmit(data.description.toString())
                    }
                }}
            />
        </Space>
    );
};

export default InitWelcome;