declare interface CroppedArea {
    x: number;
    y: number;
    width: number;
    height: number;
}

declare interface loginUserType {
    email: string;
    password: string;
}

declare interface registerUserType extends LoginUserType {
    name: string;
    photo: string;
}

declare interface certificateType {
    url: string;
    refId: string;
}

declare interface contactResType {
    _id: string;
    name: string,
    email: string,
    mobile: string,
    message: string,
    status: boolean,
    solution: string,
    date: string | Date
}

declare interface solveResType {
    _id: string,
    question: string,
    solution: string,
}