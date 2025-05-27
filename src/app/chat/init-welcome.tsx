import React, { useEffect, useState } from 'react';
import { Button, Space } from 'antd';
import { Prompts, PromptsProps, Welcome } from '@ant-design/x';
import {
    CommentOutlined,
    EllipsisOutlined,
    FireOutlined,
    HeartOutlined,
    ReadOutlined,
    ShareAltOutlined,
    SmileOutlined,
    EditOutlined,
    QuestionOutlined,
    TransactionOutlined
} from '@ant-design/icons';

import './gradient.css'; // 引入动态渐变样式

// 打字回退动画组件
const TypewriterBackspace = ({ text }: { text: string }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [speed, setSpeed] = useState(150);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (!isDeleting && displayedText.length < text.length) {
            timer = setTimeout(() => {
                setDisplayedText(text.substring(0, displayedText.length + 1));
            }, speed);
        } else if (displayedText.length === text.length && !isDeleting) {
            timer = setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && displayedText.length > 0) {
            timer = setTimeout(() => {
                setDisplayedText(text.substring(0, displayedText.length - 1));
            }, speed / 2);
        } else if (isDeleting && displayedText.length === 0) {
            timer = setTimeout(() => {
                setIsDeleting(false);
                setSpeed(150 + Math.random() * 100);
            }, 1000);
        }

        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, speed, text]);

    return <span className="description-gradient">{displayedText}</span>;
};
const AnimatedIcon = ({ icon, animationClass }: { icon: React.ReactNode, animationClass: string }) => (
    <span className={animationClass} style={{ display: 'inline-block' }}>
        {icon}
    </span>
);

// 渲染标题函数
const renderTitle = (icon: React.ReactElement, title: string) => (
    <Space align="start">
        {icon}
        <span className="label-gradient">{title}</span>
    </Space>
);

// 提示词数据
const promptItems: PromptsProps['items'] = [
    {
        key: '1',
        label: renderTitle(<FireOutlined style={{ color: '#FF4D4F' }} />, '热门话题'),
        description: <span className="label-gradient">你对什么感兴趣</span>,
        children: [
            {
                key: '1-1',
                icon: <AnimatedIcon
                    icon={<EditOutlined style={{ color: '#1890FF' }} />}
                    animationClass="shake"
                />,
                description: <span className="prompt-item-gradient">你能做什么？</span>,
            },
            {
                key: '1-2',
                icon: <AnimatedIcon
                    icon={<QuestionOutlined style={{ color: '#FAAD14' }} />}
                    animationClass="float"
                />,
                description: <span className="prompt-item-gradient">什么是 AGI？</span>,
            },
            {
                key: '1-3',
                icon: <AnimatedIcon
                    icon={<TransactionOutlined
                        spin
                        style={{ color: '#52C41A' }}
                    />}
                    animationClass="spin-scale"
                />,
                description: <span className="prompt-item-gradient">免费吗？</span>,
            },
        ],
    },
    {
        key: '2',
        label: renderTitle(<ReadOutlined style={{ color: '#1890FF' }} />, '设计指南'),
        description: <span className="label-gradient">如何设计出好产品？</span>,
        children: [
            {
                key: '2-1',
                icon: <AnimatedIcon
                    icon={<HeartOutlined style={{ color: '#FF4D4F' }} />}
                    animationClass="heartbeat"
                />,
                description: <span className="prompt-item-gradient">设计网页</span>,
            },
            {
                key: '2-2',
                icon: <AnimatedIcon
                    icon={<SmileOutlined style={{ color: '#FA8C16' }} />}
                    animationClass="wink"
                />,
                description: <span className="prompt-item-gradient">角色扮演</span>,
            },
            {
                key: '2-3',
                icon: <AnimatedIcon
                    icon={<CommentOutlined style={{ color: '#722ED1' }} />}
                    animationClass="typing"
                />,
                description: <span className="prompt-item-gradient">表达感受</span>,
            }
        ],
    },
];

type Props = {
    handleSubmit: (value: string) => void;
};

/**
 * 初始态的欢迎语和提示词
 */
const InitWelcome = (props: Props) => {
    return (
        <Space
            className="pt-10"
            direction="vertical"
            size={16}
        >
            {/* 欢迎语 */}
            <Welcome
                variant="borderless"
                icon="https://pic1.imgdb.cn/item/67d83ea588c538a9b5c00209.gif"
                title={
                    <span className="title-gradient">
                        你好，欢迎来到知无涯的DeepSeek   ฅ՞•ﻌ•՞ฅ 
                    </span>
                }
                description={<TypewriterBackspace text="愿你踏遍山河万里，览尽世间繁华，再以澄明之心，品评人间百态（〃｀ 3′〃）" />}
                extra={
                    <Space>
                        <Button icon={<ShareAltOutlined />} />
                        <Button icon={<EllipsisOutlined />} />
                    </Space>
                }
            />

            {/* 提示词 */}
            <Prompts
                title={<span className="label-gradie ">不知道要做什么？</span>}
                items={promptItems}
                styles={{
                    list: { width: '100%' },
                    item: { flex: 1 },
                }}
                onItemClick={({ data }) => {
                    const extractText = (desc: React.ReactNode): string => {
                        if (typeof desc === 'string') return desc;
                        if (React.isValidElement(desc) && typeof desc.props.children === 'string') {
                            return desc.props.children;
                        }
                        return '';
                    };
                    const text = extractText(data.description);
                    if (text) {
                        props.handleSubmit(text);
                    } else {
                        console.warn('Invalid description format:', data.description);
                    }
                }}
            />
        </Space>
    );
};

export default InitWelcome;