import React from 'react';
import {RouteContext, RouteContextType} from '@ant-design/pro-components';
import {Flex, theme, Typography} from "antd";


const {useToken} = theme;


/**
 * 页脚
 */
const FooterPage = () => {
    const {token} = useToken();

    return (
        <RouteContext.Consumer>
            {(value: RouteContextType) => {
                return !value.isMobile && (
                    <Flex
                        justify='center'
                        style={{
                            marginTop: '-8px',
                            padding: '3px 0',
                            backgroundColor: token.colorBgBase,
                        }}
                    >
                        <Typography.Text type={'secondary'}>
                            当前页面为测试页面，部分功能还在开发，敬请期待(❤ ω ❤)
                        </Typography.Text>
                    </Flex>
                )
            }}
        </RouteContext.Consumer>
    );
};

export default FooterPage;