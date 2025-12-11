import { execSync } from 'child_process';
import { writeFileSync } from 'fs';

function getGitVersion() {
  try {
    // Get the latest tag
    const tag = execSync('git describe --tags --abbrev=0 2>/dev/null || echo "v0.0.0"')
      .toString()
      .trim();
    
    // Get short commit hash
    const commit = execSync('git rev-parse --short HEAD')
      .toString()
      .trim();
    
    // Get current branch
    const branch = execSync('git rev-parse --abbrev-ref HEAD')
      .toString()
      .trim();
    
    // Check if working directory is dirty
    const isDirty = execSync('git status --porcelain')
      .toString()
      .trim() !== '';
    
    // Get build date
    const buildDate = new Date().toISOString();
    
    // Get commit count since tag
    const commitsSinceTag = execSync(`git rev-list ${tag}..HEAD --count 2>/dev/null || echo "0"`)
      .toString()
      .trim();
    
    const version = tag.replace('v', '');
    let fullVersion = version;
    
    if (commitsSinceTag !== '0') {
      fullVersion = `${version}+${commitsSinceTag}.${commit}`;
    } else {
      fullVersion = `${version}-${commit}`;
    }
    
    if (isDirty) {
      fullVersion += '-dirty';
    }
    
    return {
      version,
      commit,
      branch,
      isDirty,
      buildDate,
      commitsSinceTag: parseInt(commitsSinceTag),
      fullVersion
    };
  } catch (error) {
    console.warn('Warning: Could not read git information, using fallback version');
    return {
      version: '0.0.0',
      commit: 'unknown',
      branch: 'unknown',
      isDirty: false,
      buildDate: new Date().toISOString(),
      commitsSinceTag: 0,
      fullVersion: '0.0.0-dev'
    };
  }
}

const versionInfo = getGitVersion();

const content = `// Auto-generated file - do not edit manually
// Generated at build time from git information

export interface VersionInfo {
  version: string;
  commit: string;
  branch: string;
  isDirty: boolean;
  buildDate: string;
  commitsSinceTag: number;
  fullVersion: string;
}

export const VERSION_INFO: VersionInfo = ${JSON.stringify(versionInfo, null, 2)};
`;

writeFileSync('src/version.ts', content);
console.log(`✓ Version generated: ${versionInfo.fullVersion}`);
console.log(`  Tag: ${versionInfo.version}`);
console.log(`  Commit: ${versionInfo.commit}`);
console.log(`  Branch: ${versionInfo.branch}`);
console.log(`  Status: ${versionInfo.isDirty ? 'Modified' : 'Clean'}`);
