import { FormTitle } from "~/pages/login/components/hero/hero-title"
import { Input } from "~/components/input"
import { Button } from "~/components/button"
import { IconButton } from "~/components/icon-button"
import { styles, useLoginForm } from "."

interface FieldConfig {
  name: "email" | "password" | "nickname" | "birthday"
  label: string
  type: string
}

export const HeroForm = () => {
  const { signingUp, isSubmitting, handleSubmit, onSubmit, errors, toggleMode, register } =
    useLoginForm();

  const baseFields: FieldConfig[] = [
    { name: "email", label: "Your email", type: "email" },
    { name: "password", label: "Your password", type: "password" },
  ]

  const signUpFields: FieldConfig[] = [
    { name: "nickname", label: "Your nickname", type: "text" },
    { name: "birthday", label: "Your birthday", type: "date" },
  ]

  const fieldsToRender = signingUp
    ? [...baseFields, ...signUpFields]
    : baseFields

  const renderField = ({ name, label, type }: FieldConfig) => (
    <div key={name}>
      <label htmlFor={name} className={styles.required}>
        {label}
      </label>
      <Input
        id={name}
        placeholder={label.replace(/^Your /, "")}
        type={type}
        {...register(name)}
      />
      {errors[name] && (
        <span style={{ color: "red" }}>{errors[name]?.message}</span>
      )}
    </div>
  )

  return (
    <>
      <FormTitle signingUp={signingUp} />

      <form
        className={styles.inputs}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        {fieldsToRender.map(renderField)}

        <Button loading={isSubmitting} type="submit">
          {signingUp ? "Sign Up" : "Sign In"}
        </Button>

        <span>
          {signingUp ? "Already have an account? " : "New here? "}
          <IconButton
            type="button"
            onClick={toggleMode}
            animation={false}
          >
            <span className={styles.underline}>
              {signingUp ? "Login" : "Create an Account"}
            </span>
          </IconButton>
        </span>
      </form>
    </>
  )
}
