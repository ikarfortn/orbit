import { action } from "@storybook/addon-actions";
import { Story } from "@storybook/react";
import React from "react";
import { View } from "react-native";
import { colors, layout } from "../styles";
import SignInForm, { SignInFormProps } from "./SignInForm";

export default {
  title: "SignInForm",
  component: SignInForm,
};

const Template: Story<{
  mode: SignInFormProps["mode"];
  colorPaletteIndex: number;
  overrideEmailAddress: string;
}> = (args) => {
  const [isPendingServerResponse, setPendingServerResponse] = React.useState(
    false,
  );

  const onLogin = React.useCallback(() => {
    setPendingServerResponse(true);
    setTimeout(() => {
      setPendingServerResponse(false);
      action("Signed in")();
    }, 2000);
  }, []);

  const colorPalette = colors.palettes[args.colorPaletteIndex];

  return (
    <View
      style={{
        height: 800,
        backgroundColor: colorPalette.backgroundColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SignInForm
        onSubmit={onLogin}
        onResetPassword={action("Reset password")}
        mode={args.mode}
        isPendingServerResponse={isPendingServerResponse}
        colorPalette={colorPalette}
        overrideEmailAddress={args.overrideEmailAddress}
      />
    </View>
  );
};

Template.args = {
  colorPaletteIndex: 5,
};

export const SignIn = Template.bind({});
SignIn.args = { ...Template.args, mode: "signIn" };

export const SignInWithEmailHint = Template.bind({});
SignInWithEmailHint.args = {
  ...Template.args,
  mode: "signIn",
  overrideEmailAddress: "andy@andymatuschak.org",
};

export const SignUp = Template.bind({});
SignUp.args = { ...Template.args, mode: "register" };
