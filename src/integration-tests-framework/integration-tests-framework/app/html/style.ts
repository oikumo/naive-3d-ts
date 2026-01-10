type GlobalStyleConfigInput = {
    colors?: Partial<ColorConfig>;
    spacing?: Partial<SpacingConfig>;
    typography?: Partial<TypographyConfig>;
    layout?: Partial<LayoutConfig>;
};

export class GlobalStyle {
    private styleElement: HTMLStyleElement | null = null;
    private config: GlobalStyleConfig;

    public static readonly CLASS_ID = {
        Body: "global-style-body",
        DashboardHeader: "dashboard-header",
        DashboardHeaderH1: "dashboard-header-h1",
        DashboardGrid: "dashboard-grid",
        Sidebar: "sidebar",
        NavList: "nav-list",
        NavItem: "nav-item",
        TestContainer: "test-container",
        TestCard: "test-card",
        TestCardStatusPending: `test-card status-pending`,
        TestCardStatusSuccess: `test-card status-success`,
        TestCardStatusFailed: `test-card status-failed`,
        TestStatus: "test-status",
        TestTitle: "test-title",
        TestMeta: "test-meta",
        TestDetails: "test-details",
        ProgressContainer: "progress-container",
        ProgressBar: "progress-bar",
        Fab: "fab",
        Expanded: "expanded"
    };


    constructor(config: GlobalStyleConfigInput = {}) {
        this.config = {
            colors: {...DEFAULT_STYLE_CONFIG.colors, ...config.colors},
            spacing: {...DEFAULT_STYLE_CONFIG.spacing, ...config.spacing},
            typography: {...DEFAULT_STYLE_CONFIG.typography, ...config.typography},
            layout: {...DEFAULT_STYLE_CONFIG.layout, ...config.layout},
        };
    }

    apply(): void {
        if (this.styleElement) return;

        this.styleElement = document.createElement("style");
        this.styleElement.innerHTML = this.generateCss();
        document.head.appendChild(this.styleElement);
    }

    remove(): void {
        if (this.styleElement) {
            document.head.removeChild(this.styleElement);
            this.styleElement = null;
        }
    }

    updateConfig(newConfig: Partial<GlobalStyleConfig>): void {
        this.config = { ...this.config, ...newConfig };
        if (this.styleElement) {
            this.styleElement.innerHTML = this.generateAll();
        }
    }


    private generatePlayButton() {
        return `
            .play-btn {
            width: 40px;
            height: 40px;
            border: 2px solid #fff;
            border-radius: 50%;
            position: relative;
            }

            /* Play triangle using border technique */
            .play-btn::after {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-30%, -50%);
            border-top: 12px solid transparent;
            border-left: 20px solid #fff;
            border-bottom: 12px solid transparent;
            }

            /* Click animation */
            .play-btn:active::after {
            animation: pulse 0.4s ease;
            }

            @keyframes pulse {
            0% { transform: translate(-30%, -50%) scale(1); }
            50% { transform: translate(-30%, -50%) scale(1.2); 
                    border-left-color: #ff9900; }
            100% { transform: translate(-30%, -50%) scale(1); }
            }

        `;
    }

    private generateAll() {
        return [
            this.generateCss(), 
            this.generatePlayButton()
        ].join(); 
    }

    private generateCss(): string {
        const { colors, spacing, typography, layout } = this.config;
        
        return `
            *,
            *::before,
            *::after {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            :root {
                --primary: ${colors.primary};
                --success: ${colors.success};
                --danger: ${colors.danger};
                --warning: ${colors.warning};
                --background: ${colors.background};
                --surface: ${colors.surface};
                --text: ${colors.text};
                --border: ${colors.border};
                --body-padding: ${spacing.bodyPadding};
                --font-family: ${typography.fontFamily};
                --grid-gap: ${layout.gridGap};
                --sidebar-width: ${layout.sidebarWidth};
            }

            body {
                font-family: var(--font-family);
                background-color: var(--background);
                color: var(--text);
                line-height: 1.5;
                padding: var(--body-padding);
                min-height: 100vh;
            }

            .dashboard-header {
                text-align: center;
                margin-bottom: ${spacing.headerMarginBottom};
                position: relative;
                padding: ${spacing.headerPadding};
            }

            .dashboard-header h1 {
                font-size: ${typography.headerFontSize};
                font-weight: ${typography.headerFontWeight};
                background: ${colors.headerGradient};
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                margin-bottom: ${spacing.headerTitleMargin};
            }

            .dashboard-grid {
                display: grid;
                grid-template-columns: var(--sidebar-width) 1fr;
                gap: var(--grid-gap);
                max-width: ${layout.maxWidth};
                margin: 0 auto;
            }

            .sidebar {
                background: var(--surface);
                padding: ${spacing.sidebarPadding};
                border-radius: ${layout.borderRadius};
                height: fit-content;
                box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
            }

            .nav-list {
                list-style: none;
                display: grid;
                gap: ${spacing.navItemGap};
            }

            .nav-item {
                padding: ${spacing.navItemPadding};
                border-radius: ${layout.navItemBorderRadius};
                cursor: pointer;
                transition: all 0.2s ease;
                display: flex;
                align-items: center;
                gap: ${spacing.navItemIconGap};
            }

            .nav-item:hover {
                background: rgba(99, 102, 241, 0.1);
            }

            .test-container {
                display: grid;
                gap: ${spacing.testContainerGap};
            }

            .test-card {
                background: var(--surface);
                padding: ${spacing.cardPadding};
                border-radius: ${layout.borderRadius};
                border: 1px solid var(--border);
                transition: all 0.2s ease;
                position: relative;
                overflow: hidden;
            }

            .test-card::before {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                width: ${layout.statusIndicatorWidth};
                background: var(--status, transparent);
            }

            .test-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
            }

            .test-status {
                position: absolute;
                top: ${spacing.statusTop};
                right: ${spacing.statusRight};
                font-size: ${typography.statusFontSize};
                padding: ${spacing.statusPadding};
                border-radius: 999px;
            }

            .status-success {
                --status: var(--success);
                background: rgba(34, 197, 94, 0.1);
                color: var(--success);
            }

            .status-failed {
                --status: var(--danger);
                background: rgba(85, 68, 239, 0.1);
                color: var(--danger);
            }

            .status-pending {
                --status: var(--warning);
                background: rgba(234, 179, 8, 0.1);
                color: var(--warning);
            }

            .test-title {
                font-weight: ${typography.titleFontWeight};
                font-size: ${typography.titleFontSize};
                margin-bottom: ${spacing.titleMargin};
            }

            .test-meta {
                display: flex;
                gap: ${spacing.metaGap};
                color: #94a3b8;
                font-size: ${typography.metaFontSize};
                margin-bottom: ${spacing.metaMargin};
            }

            .test-details {
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.3s ease-out;
            }

            .test-card.expanded .test-details {
                max-height: 500px;
                margin-top: ${spacing.detailsMargin};
                padding-top: ${spacing.detailsPadding};
                border-top: 1px solid var(--border);
            }

            .progress-container {
                background: var(--background);
                border-radius: 999px;
                height: ${layout.progressHeight};
                overflow: hidden;
            }

            .progress-bar {
                height: 100%;
                background: linear-gradient(90deg, var(--success) 0%, var(--primary) 100%);
                transition: width 0.3s ease;
            }

            .fab {
                position: fixed;
                bottom: ${spacing.fabBottom};
                right: ${spacing.fabRight};
                background: var(--primary);
                width: ${layout.fabSize};
                height: ${layout.fabSize};
                border-radius: 50%;
                display: grid;
                place-items: center;
                cursor: pointer;
                box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.3);
                transition: all 0.2s ease;
            }

            .fab:hover {
                transform: scale(1.1);
            }

            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }

            .test-card {
                animation: fadeIn 0.3s ease forwards;
            }

            @media (max-width: 768px) {
                .dashboard-grid {
                    grid-template-columns: 1fr;
                }

                .sidebar {
                    display: none;
                }
            }
        ` + this.generatePlayButton();
    }
}

// Configuration interfaces
interface ColorConfig {
    primary: string;
    success: string;
    danger: string;
    warning: string;
    background: string;
    surface: string;
    text: string;
    border: string;
    headerGradient: string;
}

interface SpacingConfig {
    bodyPadding: string;
    headerMarginBottom: string;
    headerPadding: string;
    headerTitleMargin: string;
    gridGap: string;
    sidebarPadding: string;
    navItemGap: string;
    navItemPadding: string;
    navItemIconGap: string;
    testContainerGap: string;
    cardPadding: string;
    statusTop: string;
    statusRight: string;
    statusPadding: string;
    titleMargin: string;
    metaGap: string;
    metaMargin: string;
    detailsMargin: string;
    detailsPadding: string;
    fabBottom: string;
    fabRight: string;
}

interface TypographyConfig {
    fontFamily: string;
    headerFontSize: string;
    headerFontWeight: number;
    statusFontSize: string;
    titleFontWeight: number;
    titleFontSize: string;
    metaFontSize: string;
}

interface LayoutConfig {
    [x: string]: any;
    maxWidth: string;
    borderRadius: string;
    navItemBorderRadius: string;
    statusIndicatorWidth: string;
    progressHeight: string;
    fabSize: string;
    sidebarWidth: string;
}

interface GlobalStyleConfig {
    colors: ColorConfig;
    spacing: SpacingConfig;
    typography: TypographyConfig;
    layout: LayoutConfig;
}

const DEFAULT_STYLE_CONFIG: GlobalStyleConfig = {
    colors: {
        primary: "#6366f1",
        success: "#22c55e",
        danger: "#ef4444",
        warning: "#eab308",
        background: "#0f172a",
        surface: "#1e293b",
        text: "#f8fafc",
        border: "#334155",
        headerGradient: "linear-gradient(45deg, #818cf8, #6366f1)",
    },
    spacing: {
        bodyPadding: "2rem",
        headerMarginBottom: "3rem",
        headerPadding: "2rem 0",
        headerTitleMargin: "0.5rem",
        gridGap: "2rem",
        sidebarPadding: "1.5rem",
        navItemGap: "0.75rem",
        navItemPadding: "0.75rem 1rem",
        navItemIconGap: "0.75rem",
        testContainerGap: "1rem",
        cardPadding: "1.5rem",
        statusTop: "1rem",
        statusRight: "1rem",
        statusPadding: "0.25rem 0.75rem",
        titleMargin: "0.5rem",
        metaGap: "1rem",
        metaMargin: "1rem",
        detailsMargin: "1rem",
        detailsPadding: "1rem",
        fabBottom: "2rem",
        fabRight: "2rem",
    },
    typography: {
        fontFamily: "'Inter', system-ui, sans-serif",
        headerFontSize: "2.5rem",
        headerFontWeight: 800,
        statusFontSize: "0.875rem",
        titleFontWeight: 600,
        titleFontSize: "1.125rem",
        metaFontSize: "0.875rem",
    },
    layout: {
        maxWidth: "1400px",
        borderRadius: "1rem",
        navItemBorderRadius: "0.5rem",
        statusIndicatorWidth: "4px",
        progressHeight: "8px",
        fabSize: "56px",
        sidebarWidth: "250px",
    },
};
