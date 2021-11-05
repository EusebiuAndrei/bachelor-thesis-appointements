// Improve generics to infer the response type

type DomainService<Model extends Record<string, any>> = (model: Model) => Record<string, any>;

export default DomainService;
