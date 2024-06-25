export default `
<div class="wnPlugin">   

<!-- List mode -->
<div class="wnFixed wnFlexCol wnBgBlue500 wnPlugin wnList wnPl10 wnPr10 wnPb20 wnPt20 wnRoundedLg wnFlex" data-hidden="1">
    <div class="wnText4xl wnTextWhite">The list goes here</div>
</div>

    <!-- Big mode -->
    <div class="wnFixed wnFlexCol wnBgBlue500 wnPlugin wnBig wnPl10 wnPr10 wnPb20 wnPt20 wnRoundedLg wnFlex" data-hidden="1">
        <div>
            <div id="wnMsgTemplatewnBig" data-template>
                <div class="wnText4xl wnTextWhite">#{title}</div>
                <div class="wnMt4">
                    #{html}
                </div>
            </div>
        </div>
        <button class="wnMsgBigCloseBtn wnMt4 wnBgWhite wnDarkBgZinc800 wnHoverDarkBgZinc700 wnHoverBgZinc100 wnTextBlue600 wnDarkTextBlue400 wnFontBold wnPy2 wnPx4 wnRounded">
            OK (Mark as read)
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
    .wnPlugin .wnFixed {
        position: fixed;
    }

    .wnPlugin .wnJustifyEnd {
        justify-content: flex-end;
    }

    .wnPlugin .wnWFull {
        width: 100%;
    }

    .wnPlugin .wnFlexCol {
        display: flex;
        flex-direction: column;
    }

    .wnPlugin .wnBgBlue500 {
        background-color: #3498db;
    }

    .wnPlugin .wnPlugin {
        padding: 20px 10px;
        border-radius: 0.5rem;
    }

    .wnPlugin .wnBig, .wnPlugin .wnList {
        width: 60vw;
        margin: 0 auto;
        left: 50%;
        transform: translateX(-50%);      
        top: 10%;
    }

    .wnPlugin .wnSmall {
        right: 10px;
        bottom: 10px;
        max-width: 350px;
    }

    .wnPlugin .wnRoundedLg {
        border-radius: 0.5rem;
    }

    .wnPlugin .wnFlex {
        display: flex;
    }

    .wnPlugin .wnJustifyCenter {
        justify-content: center;
    }

    .wnPlugin .wnMt4 {
        margin-top: 1rem;
    }

    .wnPlugin .wnPl10 {
        padding-left: 2.5rem;
    }

    .wnPlugin .wnPr10 {
        padding-right: 2.5rem;
    }

    .wnPlugin .wnPb20 {
        padding-bottom: 5rem;
    }

    .wnPlugin .wnPt20 {
        padding-top: 5rem;
    }

    .wnPlugin .wnPt5 {
        padding-top: 1.25rem;
    }

    .wnPlugin .wnText4xl {
        font-size: 2.25rem;
    }

    .wnPlugin .wnTextWhite {
        color: #ffffff;
    }

    .wnPlugin .wnMsgBigCloseBtn {
        background-color: #ffffff;
        border-radius: 0.25rem;
        padding: 0.5rem 1rem;
        color: #3498db;
        font-weight: bold;
    }

    .wnPlugin .wnMsgTitle {
        font-weight: bold;
    }

    .wnPlugin .wnMsgShortDescription {
        margin-top: 1.5rem;
    }

    .wnPlugin .wnMsgLearnMoreBtn {
        background-color: #ffffff;
        border-radius: 0.25rem;
        padding: 0.5rem 1rem;
        color: #3498db;
        font-weight: bold;
    }

    .wnPlugin [data-hidden='1'] {
        display: none;
    }

    .wnPlugin .wnPlugin a, 
    .wnPlugin .wnPlugin h1, 
    .wnPlugin .wnPlugin h2, 
    .wnPlugin .wnPlugin p, 
    .wnPlugin .wnPlugin span, 
    .wnPlugin .wnPlugin li {
        color: #ffffff;
    }

    .wnPlugin .wnPlugin h1 {
        color: #000000;
        font-size: 30px;
        padding-bottom: 12px;
    }

    .wnPlugin .wnPlugin h2 {
        font-size: 25px;
        padding-bottom: 8px;
    }

    .wnPlugin .wnPlugin iframe {
        margin-bottom: 10px;
        margin-top: 10px;
    }
    .wnPlugin *{
        font-family: ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    }
    .wnPlugin [role=button],.wnPlugin button {
        cursor: pointer;
    }
    .wnPlugin button,.wnPlugin input,.wnPlugin optgroup,.wnPlugin select,.wnPlugin textarea {
        font-family: inherit;
        font-size: 100%;
        line-height: 1.15;
        margin: 0;
    }
    .wnPlugin *,.wnPlugin ::after,.wnPlugin ::before {
        box-sizing: border-box;
        border-width: 0;
        border-style: solid;
        border-color: currentColor;
    }
</style>`