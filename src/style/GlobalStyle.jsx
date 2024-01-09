import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    /* v2.0 | 20110126
    http://meyerweb.com/eric/tools/css/reset/ 
    License: none (public domain)
    */
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    /* font: inherit; */
    vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
    display: block;
    }
    body {
    line-height: 1;
    }
    ol, ul {
    list-style: none;
    }
    blockquote, q {
    quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
    content: '';
    content: none;
    }
    table {
    border-collapse: collapse;
    border-spacing: 0;
    }
    a{
    text-decoration: none;
    }
    img{
    display: block;
    width: 100%;
    }
    button{
        cursor: pointer;
    }
    .loginContainer{
        max-width: 1280px;
        margin: 70px auto 100px;
    }

    .loginPage{
        display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    h1{
        font-size: 35px;
        text-align: center;
        margin-bottom: 30px;
    }
    form{
        display: flex;
        flex-direction: column;
        .inputLine{
            display: flex;
            font-size: 14px;
            height: 56px;
            padding-left: 18px;
            border-radius: 8px;
            background-color: #ffffff;
            box-shadow: inset 0px 0px 0px 1px rgba(0, 0, 0, 0.1);
            .loginIco{
                font-size: 23px;
            }


        }
    }
    }

    .rightSection{
        padding-left: 330px;
        .container{
            padding: 20px 50px 70px;
        }
    }

    .mask{
        position: fixed;
        width: calc(100% - 330px);
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        left: 330px;
        top: 73px;
    }

    .writeBoxWrap{
        width: 85%;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 50px;
        padding: 20px;
        background: #fff;
        border-radius: 10px;
        .writeTTlBox{
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #9a9a9a;
            padding-bottom: 20px;
            margin-bottom: 20px;
            h2{
                font-size: 20px;
            }
            .closeBtn{
                border: none;
                background: transparent;
                .closeIco{
                    font-size: 30px;
                }
            }
            .closeBtn:hover{
                    cursor: pointer;
                    .closeIco:hover{
                    cursor: pointer;
                    }
            }

        }
        input{
            width: 100%;
            margin-bottom: 20px;
        }
        .submitBtn{
            float: right;
            width: 70px;
            padding: 5px 0;
        }
    }
    .ql-toolbar.ql-snow {
        height: 40px;
    }
    .ql-container{
        height: calc(100% - 40px);
    }

`



export default GlobalStyle;