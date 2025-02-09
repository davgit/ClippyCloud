import { render, fireEvent } from '@testing-library/vue'
import Home from './Home.vue'

const mockUseRouter = { push: jest.fn() }

jest.mock('vue-router', () => ({
  useRouter: () => mockUseRouter,
}))

jest.mock('@/components/Text/types', () => ({
  ETextTypes: { P: 'p', SPAN: 'span', STRONG: 'strong' },
}))

jest.mock('@/components/Button/types', () => ({
  EThemes: { Default: 'default' },
}))

describe('<Home />', () => {
  beforeEach(jest.clearAllMocks)

  it('should redirect to Upload page when primary button is pressed', async () => {
    const { findByTestId } = render(Home)

    const button = await findByTestId('primary-button')
    await fireEvent.click(button)

    expect(button).not.toBeNull()
    expect(mockUseRouter.push).toHaveBeenNthCalledWith(1, { name: 'Upload' })
  })

  it('should redirect to MyUploads page when secondary button is pressed', async () => {
    const { findByTestId } = render(Home)

    const button = await findByTestId('secondary-button')
    await fireEvent.click(button)

    expect(button).not.toBeNull()
    expect(mockUseRouter.push).toHaveBeenNthCalledWith(1, { name: 'MyUploads' })
  })
})
