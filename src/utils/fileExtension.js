export const fileExtension = (filePath)=>{
    return filePath?.split('.')?.pop()?.toLowerCase();
  }