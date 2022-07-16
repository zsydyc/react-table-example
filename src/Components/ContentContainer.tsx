import styled from '@emotion/styled'

export const ContainerHeaderSection = styled.section`
  background: #23252E;
  
  display: flex;
  justify-content: space-between;

  padding: 17.5px 24px;
  border: 1px solid rgba(145, 145, 160, 0.1);

  height: 56px;
`

export const ContainerArticle = styled.article`
  border: 1px solid rgba(145, 145, 160, 0.1);
  border-radius: 8px; 
  overflow: hidden;
`

export const ContainerDivider = styled.hr`
  display: block;
  margin: 0;
  height: 1px;

  background: rgba(0, 0, 0, 0.2);

  border: none;
  border-bottom: 1px solid rgba(145, 145, 160, 0.2);
`

export const HeaderTitle = styled.h3`
  font-weight: 400;
  font-size: 16px;
`

export const ContainerHeader = ({ children }: { children: React.ReactNode }) => (
  <>
    <ContainerHeaderSection>
      {children}
    </ContainerHeaderSection>
    <ContainerDivider />
  </>
)

// These are just semantic elements for separation
// All of the left styling happens in the ContainerHeader
export const HeaderSection = styled.section`
  display: flex;
  align-items: center;

  font-size: 14px

  svg {
    font-size: 14px;
  }

  & > * {
    margin-left: 1.5em; // 23px
  }
`
