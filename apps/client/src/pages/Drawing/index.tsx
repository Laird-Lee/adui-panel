import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";

const Drawing = () => {
  return (
    <Excalidraw langCode="zh-CN">
      <WelcomeScreen />
      <MainMenu>
        <MainMenu.DefaultItems.ClearCanvas />
        <MainMenu.DefaultItems.Export />
        <MainMenu.DefaultItems.SaveAsImage />
        <MainMenu.DefaultItems.ToggleTheme />
        <MainMenu.DefaultItems.ChangeCanvasBackground />
      </MainMenu>
    </Excalidraw>
  );
};
export default Drawing;
