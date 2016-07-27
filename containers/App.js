import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {fetchPostsIfNeeded,weekChoice,giftIdChoice} from '../actions'
import Posts from '../components/Posts'

class App extends Component {
  constructor(props) {
    super(props)
    this.weekChoiceFn = this.weekChoiceFn.bind(this)
    this.giftIdChoiceFn = this.giftIdChoiceFn.bind(this)
  }

  //初始化渲染后触发
  componentDidMount() {
    const { dispatch,isNextWeek,giftId} = this.props
    console.log(55699);
    console.log(isNextWeek);
    // 遇到的问题是，如果让weekChoice的值变为不是0就是1，也就是如何获取weekChoice的返回值
    //就是如果成功了，就基本成功了
    dispatch(fetchPostsIfNeeded(isNextWeek,giftId))
  }

  //每次接受新的props触发
  componentWillReceiveProps(nextProps) {

    if ((nextProps.isNextWeek !== this.props.isNextWeek) || (nextProps.giftId !== this.props.giftId) ) {
      const { dispatch, isNextWeek ,giftId} = nextProps
      dispatch(fetchPostsIfNeeded(isNextWeek,giftId))
    }

  }

  // 上周还是本周
  weekChoiceFn() {

    this.props.dispatch(weekChoice(1));
    
  }
  
  // 送出榜还是收到榜
  giftIdChoiceFn() {

    this.props.dispatch(giftIdChoice(402));
    
  }

  render() {
    const { posts } = this.props
    console.log(posts);
    console.log('数据已经传过来了，哈哈哈，终于成功了');
    return (
      <div>
        
            loading....
            <a href="#"
               onClick={this.weekChoiceFn}>
              上周
            </a>
            <br />
             <a href="#"
               onClick={this.giftIdChoiceFn}>
              收到还是送出
            </a>
            <br />
            如果成功，则为{posts.result}
          {/** <Posts posts={posts} />**/}
      </div>
    )
  }
}


function mapStateToProps(state) {
  // 这里很重要，这里需要用到的状态都要返回，不然无法实现
  const { postsByReddit ,isNextWeek,giftId} = state
  const {

    items: posts

  } = postsByReddit[isNextWeek] || {
    items: []
  }

  return {
    posts,
    isNextWeek,
    giftId
  }
}

export default connect(mapStateToProps)(App)

