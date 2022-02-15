import React from 'react'

const DropDown = ({data, data2 = [], callback, active, active2, nums =[]}) => {
  return (
    <>
    <nav id="navigation">
      <ul class="links" onClick={(e) => {
        document.getElementsByClassName('links')[0].classList.add('open')
      }}>
        <li class="dropdown1"><a href="#" class="trigger-drop">Select Attribute<i class="arrow"></i></a>
          <ul class="drop" onClick={(e) => {
            
          }}>
            {
              data.map(node =>
              
              <li onClick={(e) => {
                callback(node, 0)
                document.getElementsByClassName('links')[0].classList.remove('open')
                e.stopPropagation()
              }}>
                <a>{node}</a>
                <span style={{
                    'marginLeft': '5px',
                    'color': 'white',
                    'backgroundColor': 'purple',
                    'padding': `3px 6px`,
                    'position': 'absolute',
                    'right': '10px',
                    'borderRadius': '5px',
                    'verticalAlign': 'middle',
                    'marginTop': '3px',

                }}>{nums.indexOf(node) > -1 ? 'N' : 'C'}</span>
              </li>)
            }
          </ul>
        </li>
        {/* {data2.length > 0 &&
          <li class="dropdown2"><a href="#" class="trigger-drop">Select YAttribute<i class="arrow"></i></a>
            <ul class="drop">
              {data2.length > 0 && (
                data2.map(node => <li onClick={() => callback(node, 1)}><a>{node}</a></li>)
              )}
            </ul>
          </li>
        } */}
      </ul>
    </nav>
    {/* <div class="container">
        <div class="tutorial">
          <ul>
            <li>Select Attribute <i class="fa fa-angle-down"></i>
              <ul>
                {data.map(node => <li onClick={() => callback(node)}>{node.key}<span>L</span></li>)}
              </ul>
            </li>
          </ul>
        </div>
      </div> */}
    </>
  )
}

export default DropDown;
