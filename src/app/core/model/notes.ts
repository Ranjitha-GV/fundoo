import { Checklists } from "./checklists";
import { Labels } from "./labels";

export interface Notes 
{
collaberator: Array<Object>,
color: string,
createdDate: string,
description: string,
id: string,
imageUrl: string,
isArchived: boolean,
isDeleted: boolean,
isPined: boolean,
label: Array<Labels>,
linkUrl: string,
modifiedDate: string,
noteCheckLists: Array<Checklists>,
noteLabels: Array<Labels>,
questionAndAnswerNotes: Array<Object>,
reminder: [Date],
title: string,
userId: string
}



