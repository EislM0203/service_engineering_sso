export class User{
constructor(
    public name: string,
    public idToken: string,
    public accessToken: string
){}

get Token(){
    return this.idToken;
}

}