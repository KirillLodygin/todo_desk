import { useDispatch } from 'react-redux'

export const mockedUseAppDispatch = jest.fn()

jest.mock('../hooks', () => ({
    ...jest.requireActual('../hooks'),
    useAppDispatch: () => mockedUseAppDispatch,
}))
