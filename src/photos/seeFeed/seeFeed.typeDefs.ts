import {gql} from "apollo-server-express";

export default gql`
    type Query{
        seeFeed(lastId:Int):[Photo] #내 팔로잉 목록에 있는 사람들의 photo를 조회
    }
`;