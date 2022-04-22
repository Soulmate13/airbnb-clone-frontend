import Head from 'next/head';
import React from 'react';
import Navbar from '../Navbar/Navbar';

interface IProps {
    children: React.ReactNode,
    title: string;
    description: string;
}

const Layout = ({ children, title, description } : IProps) => {
  return (
    <div>
      <Head>
        <title key="title">{title}</title>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        <meta name="description" content={description}/>
      </Head>
      <Navbar/>
      {children}
    </div>
  );
};

export default Layout;
