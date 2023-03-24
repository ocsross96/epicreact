// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
import {build, fake} from '@jackfranklin/test-data-bot'

// uses faker under the hood
const buildLoginForm = build({
  fields: {
    usernameText: fake(f => f.internet.userName()),
    passwordText: fake(f => f.internet.password()),
  },
})

test('submitting the form calls onSubmit with username and password', async () => {
  const {usernameText, passwordText} = buildLoginForm({passwordText: 'abc'})

  const handleSubmit = jest.fn()

  render(<Login onSubmit={handleSubmit} />)
  const username = screen.getByLabelText(/username/i)
  const password = screen.getByLabelText(/password/i)

  await userEvent.type(username, usernameText)
  await userEvent.type(password, passwordText)
  await userEvent.click(screen.getByRole('button', {name: /submit/i}))

  expect(handleSubmit).toHaveBeenCalledWith({
    username: usernameText,
    password: passwordText,
  })
})

/*
eslint
  no-unused-vars: "off",
*/
