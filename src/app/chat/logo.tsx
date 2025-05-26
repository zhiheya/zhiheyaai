import React from 'react';
import Image from "next/image";

const Logo = () => {
    return (
        <div className='w-12 ml-1.5'>
            <Image
                className="dark:invert"
                src="https://pic1.imgdb.cn/item/67d83e9488c538a9b5c001fc.jpg"
                alt="ZHIWUYA logo"
                width={38}
                height={38}
                priority
            />
        </div>
    );
};

export default Logo;