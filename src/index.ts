import { HtmlScreen } from './screen/html-screen/html-screen.ts';
import { UserInputLogger } from "./user/user-input-logger.ts";
import { Main } from './main/main.ts';

const userInputLogger = new UserInputLogger();
const screen = new HtmlScreen();

screen.setMouseObserver(userInputLogger);

const main = new Main(screen);
main.run();
