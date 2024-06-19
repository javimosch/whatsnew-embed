export default `
<div class="wnHtml">   

    <!-- Big mode -->
    <div class="wnFixed wnFlexCol wnBgBlue500 wnPlugin wnBig wnPl10 wnPr10 wnPb20 wnPt20 wnRoundedLg wnFlex" data-hidden="1">
        <div id="wnMsgTemplatewnBigParent">
            <div id="wnMsgTemplatewnBig" data-template>
                <div class="wnText4xl wnTextWhite">#{title}</div>
                <div class="wnMt4">
                    #{html}
                </div>
            </div>
        </div>
        <button class="wnMsgBigCloseBtn wnMt4 wnBgWhite wnDarkBgZinc800 wnHoverDarkBgZinc700 wnHoverBgZinc100 wnTextBlue600 wnDarkTextBlue400 wnFontBold wnPy2 wnPx4 wnRounded">
            Mark as read
        </button>
    </div>

    <!-- Small mode -->
    <div class="wnFixed wnFlexCol wnBgBlue500 wnPlugin wnSmall wnPl10 wnPr10 wnPb20 wnPt5 wnRoundedLg wnFlex wnJustifyCenter animate__animated animate__fadeInRight" data-hidden="1">
        <div class="wnWFull wnFlex wnJustifyEnd">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 24 24">
                    <path fill="white"
                        d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z" />
                </svg>
            </div>
        </div>
        <div>
            <div id="wnMsgTemplatewnSmall" data-template>
                <span class="wnMsgTitle wnFontBold">#{computedTitle}</span>
                <p class="wnMsgShortDescription wnMt6">#{shortDescription}</p>

                <button class="wnMsgLearnMoreBtn wnMt4 wnBgWhite wnDarkBgZinc800 wnHoverDarkBgZinc700 wnHoverBgZinc100 wnTextBlue600 wnDarkTextBlue400 wnFontBold wnPy2 wnPx4 wnRounded">
                    Learn More
                </button>
            </div>
        </div>
    </div>
</div>
<style scoped>
    .wnHtml .wnFixed {
        position: fixed;
    }

    .wnHtml .wnJustifyEnd {
        justify-content: flex-end;
    }

    .wnHtml .wnWFull {
        width: 100%;
    }

    .wnHtml .wnFlexCol {
        display: flex;
        flex-direction: column;
    }

    .wnHtml .wnBgBlue500 {
        background-color: #3498db;
    }

    .wnHtml .wnPlugin {
        padding: 20px 10px;
        border-radius: 0.5rem;
    }

    .wnHtml .wnBig {
        width: 60vw;
        margin: 0 auto;
        left: 50%;
        transform: translateX(-50%);      
        top: 10%;
    }

    .wnHtml .wnSmall {
        right: 10px;
        bottom: 10px;
        max-width: 350px;
    }

    .wnHtml .wnRoundedLg {
        border-radius: 0.5rem;
    }

    .wnHtml .wnFlex {
        display: flex;
    }

    .wnHtml .wnJustifyCenter {
        justify-content: center;
    }

    .wnHtml .wnMt4 {
        margin-top: 1rem;
    }

    .wnHtml .wnPl10 {
        padding-left: 2.5rem;
    }

    .wnHtml .wnPr10 {
        padding-right: 2.5rem;
    }

    .wnHtml .wnPb20 {
        padding-bottom: 5rem;
    }

    .wnHtml .wnPt20 {
        padding-top: 5rem;
    }

    .wnHtml .wnPt5 {
        padding-top: 1.25rem;
    }

    .wnHtml .wnText4xl {
        font-size: 2.25rem;
    }

    .wnHtml .wnTextWhite {
        color: #ffffff;
    }

    .wnHtml .wnMsgBigCloseBtn {
        background-color: #ffffff;
        border-radius: 0.25rem;
        padding: 0.5rem 1rem;
        color: #3498db;
        font-weight: bold;
    }

    .wnHtml .wnMsgTitle {
        font-weight: bold;
    }

    .wnHtml .wnMsgShortDescription {
        margin-top: 1.5rem;
    }

    .wnHtml .wnMsgLearnMoreBtn {
        background-color: #ffffff;
        border-radius: 0.25rem;
        padding: 0.5rem 1rem;
        color: #3498db;
        font-weight: bold;
    }

    .wnHtml [data-hidden='1'] {
        display: none;
    }

    .wnHtml .wnHtml a, 
    .wnHtml .wnHtml h1, 
    .wnHtml .wnHtml h2, 
    .wnHtml .wnHtml p, 
    .wnHtml .wnHtml span, 
    .wnHtml .wnHtml li {
        color: #ffffff;
    }

    .wnHtml .wnHtml h1 {
        color: #000000;
        font-size: 30px;
        padding-bottom: 12px;
    }

    .wnHtml .wnHtml h2 {
        font-size: 25px;
        padding-bottom: 8px;
    }

    .wnHtml .wnHtml iframe {
        margin-bottom: 10px;
        margin-top: 10px;
    }
    .wnHtml *{
        font-family: ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    }
    .wnHtml [role=button],.wnHtml button {
        cursor: pointer;
    }
    .wnHtml button,.wnHtml input,.wnHtml optgroup,.wnHtml select,.wnHtml textarea {
        font-family: inherit;
        font-size: 100%;
        line-height: 1.15;
        margin: 0;
    }
    .wnHtml *,.wnHtml ::after,.wnHtml ::before {
        box-sizing: border-box;
        border-width: 0;
        border-style: solid;
        border-color: currentColor;
    }
</style>`