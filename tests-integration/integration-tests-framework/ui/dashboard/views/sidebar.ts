export function createSidebar() {
    const sidebar = document.createElement("div");
    sidebar.className = "sidebar";
    
    const navList = document.createElement("ul");
    navList.className = "nav-list";

    const navItem = document.createElement("li");
    navItem.className = 'nav-item';
    navItem.innerHTML = '<i class="fas fa-play"></i>Run All Tests';

    const navItem2 = document.createElement("li");
    navItem2.className = 'nav-item';
    navItem2.innerHTML = '<i class="fas fa-filter"></i>Filter Results';

    const navItem3 = document.createElement("li");
    navItem3.className = 'nav-item';
    navItem3.innerHTML = '<i class="fas fa-chart-line"></i>Analytics';

    const navItem4 = document.createElement("li");
    navItem4.className = 'nav-item';
    navItem4.innerHTML = '<i class="fas fa-cog"></i>Settings';

    navList.appendChild(navItem);
    navList.appendChild(navItem2);
    navList.appendChild(navItem3);
    navList.appendChild(navItem4);
    sidebar.appendChild(navList);

    return sidebar;
}
