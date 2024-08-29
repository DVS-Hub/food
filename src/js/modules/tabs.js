function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass){
    const tabMenu = document.querySelector(tabsSelector),
          tabContent = document.querySelectorAll(tabsContentSelector),
          tabMenuItem = tabMenu.querySelectorAll(tabsParentSelector);

    function tabHide() {
        tabContent.forEach((item) => {
            item.classList.add("hide");
            item.classList.remove("show", "fade");
        });
        tabMenuItem.forEach((item) => {
            item.classList.remove(activeClass);
        });
    }

    function tabShow(i = 0) {
        tabContent[i].classList.add("show", "fade");
        tabContent[i].classList.remove("hide");
        tabMenuItem[i].classList.add(activeClass);
    }

    tabHide();
    tabShow();

    tabMenu.addEventListener('click', (event) => {
        let target = event.target;
        if (target && target.classList.contains(tabsParentSelector.slice(1))){
            tabMenuItem.forEach((item, i) => {
                if(target == item){
                    tabHide();
                    tabShow(i);
                }
            });
        }
    });
}

export default tabs;