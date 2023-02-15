import React from 'react'
import styled from 'styled-components'

const Title = styled.h3`
  text-transform: uppercase;
  background-image: linear-gradient(-225deg, #231557 0%, #44107a 29%, #ff1361 67%, #fff800 100%);
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  color: #fff;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textClip 2s linear infinite;
  display: flex;
  font-size: 20px;
  height: 40px;
  align-items: center;
  @keyframes textClip {
    to {
      background-position: 200% center;
    }
  }
`

// eslint-disable-next-line react/prop-types
const Logo = ({title}) => (
  <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      className="logo-image"
      width={32}
      height={32}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M39.598 8.601c-3.446 1.076-6.067 3.69-7.144 7.129a.56.56 0 0 1-1.074 0c-1.076-3.439-3.698-6.053-7.143-7.129a.558.558 0 0 1 0-1.07C27.681 6.455 30.303 3.84 31.38.4a.56.56 0 0 1 1.074 0c1.077 3.44 3.698 6.055 7.144 7.13a.558.558 0 0 1 0 1.07Z"
        fill="#FFDA93"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.4 40C8.702 40 0 31.316 0 20.642c0-9.055 6.172-16.81 15.01-18.858a3.237 3.237 0 0 1 3.881 2.414 3.227 3.227 0 0 1-2.418 3.872C10.675 9.414 6.467 14.7 6.467 20.642c0 7.116 5.802 12.905 12.933 12.905 6.206 0 11.55-4.412 12.706-10.492a3.23 3.23 0 0 1 3.78-2.568 3.226 3.226 0 0 1 2.574 3.771C36.724 33.38 28.709 40 19.4 40Z"
        fill="#FFF"
      ></path>
    </svg>

    <div>
      <Title>{title}</Title>
    </div>
  </div>
)

export default Logo
