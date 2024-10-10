interface ExpoDependenciesStatus {
  actual: Record<string, string>
  expected: Record<string, string>
  isInSync: boolean
}

export async function readExpoDependenciesStatus (projectDirectory: string): Promise<ExpoDependenciesStatus>
